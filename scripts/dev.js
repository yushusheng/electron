import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.join(__dirname, '..')

// 启动Vite开发服务器
const viteProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: projectRoot
})

// 等待2秒确保Vite服务器启动完成
setTimeout(() => {
  // 启动Electron应用
  const electronProcess = spawn('npm', ['run', 'electron:dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: projectRoot
  })

  // 处理进程退出
  electronProcess.on('close', () => {
    viteProcess.kill()
    process.exit()
  })
}, 2000)

// 处理进程退出
process.on('SIGTERM', () => {
  viteProcess.kill()
  process.exit()
})