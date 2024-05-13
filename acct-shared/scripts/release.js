#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
'use strict'

const packageJson = require('../package.json')
const { execSync } = require('child_process')
const inquirer = require('inquirer')

const rebuildCurrent = 'rebuild current'
const SEMVER_INCREMENTS = [rebuildCurrent, 'patch', 'minor', 'major']
const getSemVer = () =>
  process.env.SEMVER
    ? Promise.resolve({ packageVersion: process.env.SEMVER })
    : inquirer.prompt({
        type: 'list',
        name: 'packageVersion',
        message: `Current: ${packageJson.version} | Select a version to apply:`,
        choices: SEMVER_INCREMENTS,
      })

getSemVer().then(({ packageVersion }) => {
  if (
    SEMVER_INCREMENTS.includes(packageVersion) &&
    packageVersion !== rebuildCurrent
  ) {
    execSync(`npm --no-git-tag-version version ${packageVersion}`)
  }

  process.exit()
})
