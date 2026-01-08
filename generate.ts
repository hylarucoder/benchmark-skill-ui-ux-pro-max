#!/usr/bin/env npx tsx
/**
 * 静态页面生成脚本
 * 使用 Claude Code SDK 根据提示词生成静态 HTML 页面
 */

import { promises as fs } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { query } from '@anthropic-ai/claude-agent-sdk'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = resolve(__dirname)
const PROMPTS_FILE = resolve(ROOT_DIR, 'prompts.json')
const PAGES_DIR = resolve(ROOT_DIR, 'pages')
const DIST_DIR = PAGES_DIR

// ==================== 配置 ====================

// GLM 配置（这里需要你的 GLM API Key）
const GLM_API_KEY = process.env.GLM_API_KEY || 'put your key hire'

// GLM Base URL (根据实际情况修改)
const GLM_BASE_URL = 'https://open.bigmodel.cn/api/anthropic'

// ==================== 类型定义 ====================

interface PromptItem {
  id: string
  prompt: string
  status?: 'pending' | 'in_progress' | 'completed' | 'failed'
  folder?: string
}

// ==================== 工具函数 ====================

/**
 * 延迟函数
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 确保目录存在
 */
async function ensureDir(dir: string): Promise<void> {
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
}

/**
 * 读取 prompts.json
 */
async function readPrompts(): Promise<PromptItem[]> {
  const content = await fs.readFile(PROMPTS_FILE, 'utf-8')
  return JSON.parse(content)
}

/**
 * 写入 prompts.json
 */
async function writePrompts(prompts: PromptItem[]): Promise<void> {
  await fs.writeFile(PROMPTS_FILE, JSON.stringify(prompts, null, 2) + '\n')
}

/**
 * 更新单个 prompt 的状态
 */
async function updatePromptStatus(id: string, status: PromptItem['status']): Promise<void> {
  const prompts = await readPrompts()
  const item = prompts.find((p) => p.id === id)
  if (item) {
    item.status = status
    await writePrompts(prompts)
  }
}

// ==================== 主函数 ====================

/**
 * 生成单个页面
 */
async function generatePage(item: PromptItem): Promise<boolean> {
  const { id, prompt } = item
  const outputPath = resolve(PAGES_DIR, id, 'index.html')

  console.log(`\n[${id}] 开始生成...`)
  console.log(`[${id}] 提示词: ${prompt}`)

  try {
    // 调用 Claude Code SDK，让它使用 Write 工具直接写入文件
    const q = query({
      prompt: `请使用 ui-ux-pro-max skill, ${prompt}, 最后的文件保存到 "${outputPath}"`,
      options: {
        cwd: ROOT_DIR,
        settingSources: ["user", "project"],
        env: {
          ...process.env,
          ANTHROPIC_API_KEY: GLM_API_KEY,
          ANTHROPIC_AUTH_TOKEN: GLM_API_KEY,
          ANTHROPIC_BASE_URL: GLM_BASE_URL,
          ANTHROPIC_MODEL: 'glm-4.7'
        },
        permissionMode: 'bypassPermissions',
        allowDangerouslySkipPermissions: true
      }
    })

    // 等待完成
    for await (const message of q) {
      // 显示进度点
      process.stdout.write('.')
    }

    console.log('')

    // 验证文件是否已生成
    try {
      await fs.access(outputPath)
      console.log(`[${id}] ✅ 已生成: ${outputPath}`)
      return true
    } catch {
      throw new Error('文件未生成')
    }
  } catch (error) {
    console.error(`[${id}] ❌ 失败:`)
    if (error instanceof Error) {
      console.error(`  Message: ${error.message}`)
      console.error(`  Stack: ${error.stack}`)
    } else {
      console.error(`  Error:`, JSON.stringify(error, null, 2))
    }
    return false
  }
}

/**
 * 主流程
 */
async function main(): Promise<void> {
  console.log('========================================')
  console.log('  静态页面生成器')
  console.log('========================================')

  // 读取提示词列表
  const prompts = await readPrompts()
  console.log(`\n找到 ${prompts.length} 个提示词`)

  // 确保输出目录存在
  await ensureDir(DIST_DIR)

  // 串行处理每个提示词
  let successCount = 0
  let failCount = 0

  for (const item of prompts) {
    // 检查文件是否已存在，存在则跳过
    const outputPath = resolve(PAGES_DIR, item.id, 'index.html')
    try {
      await fs.access(outputPath)
      console.log(`\n[${item.id}] 文件已存在，跳过`)
      continue
    } catch {
      // 文件不存在，继续生成
    }

    // 更新状态为 in_progress
    await updatePromptStatus(item.id, 'in_progress')

    // 生成页面
    const success = await generatePage(item)

    // 更新状态
    await updatePromptStatus(
      item.id,
      success ? 'completed' : 'failed'
    )

    if (success) {
      successCount++
    } else {
      failCount++
    }

    // 间隔一下，避免请求过快
    if (prompts.indexOf(item) < prompts.length - 1) {
      console.log('\n等待 2 秒...')
      await delay(2000)
    }
  }

  // 总结
  console.log('\n========================================')
  console.log('  生成完成')
  console.log('========================================')
  console.log(`成功: ${successCount}`)
  console.log(`失败: ${failCount}`)
  console.log(`总计: ${prompts.length}`)
  console.log(`\n输出目录: ${DIST_DIR}`)
}

main().catch((error) => {
  console.error('Fatal error:')
  if (error instanceof Error) {
    console.error(`  Message: ${error.message}`)
    console.error(`  Stack: ${error.stack}`)
  } else {
    console.error(JSON.stringify(error, null, 2))
  }
  process.exit(1)
})
