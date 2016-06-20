let path = require('path')
let fs = require('fs')

module.exports = (algoPath, done) => {
  let repository = isGitRepo(algoPath)
  let local = !repository

  if (algoPath) {
    if (repository) {
      loadFromRepo(algoPath, done)
    } else if (local) {
      loadFromLocal(algoPath, done)
    } else return done('No player loaded [needs to be repository or local selected].')
  }
}

function isGitRepo(path) {
  var pattern = new RegExp('((git|ssh|http(s)?)|(git@[\w\.]+))(:(//)?)([\w\.@\:/\-~]+)(\.git)(/)?')

  return pattern.test(path)
}

function loadFromRepo(repoPath) {

  cloneRepo(repoPath, (error, targetPath) => {
    requireModule(path.resolve(targetPath, 'dist'), done)
  })
}

function cloneRepo(repoPath, done) {
 
  let exec = require('child_process').exec

  createTmpDirectory((err, targetPath) => {
    exec(
      'git clone ' + repoPath + ' ' + targetPath, 
    (error, stdout) => done(error, targetPath))
  })
}

function createTmpDirectory(done) {
  let timestamp = Date.now()
  let targetPath = path.resolve('/tmp', timestamp.toString())

  fs.mkdir(targetPath, (err) => done(err, targetPath))
}


function loadFromLocal(filePath, done) {

  requireModule(filePath, done)
}


function requireModule(filePath, done) {
  let timestamp = Date.now()
  let readAccess = fs.R_OK
  let player
  let err

  filePath = path.resolve(filePath)

  console.log('filePath:', filePath)

  fs.access(filePath, readAccess, (accessError) => {
    if (accessError) {
      return done(accessError)
    } else {
      try { 
        player = require(filePath)
      } catch (requestError) {
        err = requestError
      } finally {
        return done(err, player)
      }
    }
  })
}

