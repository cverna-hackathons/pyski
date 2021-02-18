import path from 'path'
import { access, mkdir } from 'fs/promises'
import { promisify } from 'util'
import { exec } from 'child_process'

const executeCommand = promisify(exec)

export const playerLoader = async (algoPath: String) => {
  let repository = isGitRepo(algoPath)
  let local = !repository

  if (algoPath) {
    if (repository) {
      return loadFromRepo(algoPath)
    } else if (local) {
      return loadFromLocal(algoPath)
    } else
      throw new Error(`Unrecognized player option`)
  }
}

function isGitRepo(path) {
  var pattern = new RegExp(
    '((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?',
  )

  return pattern.test(path)
}

async function loadFromRepo(repoPath) {
  return loadFromLocal(path.resolve(await cloneRepo(repoPath), 'dist'))
}

async function cloneRepo(repoPath) {
  const targetPath = await createTmpDirectory()
  await executeCommand(`git clone ${repoPath} ${targetPath}`)
  return targetPath
}

async function createTmpDirectory() {
  const timestamp = Date.now()
  const targetPath = path.resolve('/tmp', `${timestamp}`)

  await mkdir(targetPath)

  return targetPath
}

async function loadFromLocal(filePath) {
  let player

  try {
    filePath = path.resolve(filePath)
    await access(filePath)
    player = require(filePath)
  } catch (error) {
    console.log('error reading path', filePath)
  }

  return player
}
