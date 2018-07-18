<a href="http://fineuploader.com">
   <img src="https://cdn.worldvectorlogo.com/logos/react.svg" height="64">
   <img src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L5K1I1WsuQMZ8ecEuWg%2Favatar.png?generation=1518623866348435&alt=media" height="64">
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Wc1n4yD3zD7zmXE6NaZDwUXwV8JMPcoMrc8FcbqceY0glqgkDg" height="64">
</a>

[![Experimental!](https://img.shields.io/badge/wildly-experimental_%F0%9F%94%AC-ff69b4.svg)]()
[![npm](https://img.shields.io/npm/v/react-redux-uploader.svg)](https://www.npmjs.com/package/react-redux-uploader)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)
[![Build Status](https://travis-ci.com/thclark/react-redux-uploader.svg?branch=master)](https://travis-ci.com/thclark/react-redux-uploader)

## !! WORK IN PROGRESS !!

This is totally not ready for you to use. Entire chunks might be missing. It's not even at version 0.1 yet. EVERYTHING is subject to breaking changes.

## Overview

Uses a [redux]() store to keep track of one or more [Fine Uploader](http://fineuploader.com) instances in a React app.

Allows you to build any file uploader UI imaginable.

With an always-up-to-date and mappable state, you can tie any component to the upload progress or status, control the uploader via actions, reducers or in sagas.

### Wait, but why? - working with `react-fine-uploader`

[`react-fine-uploader`](https://github.com/FineUploader/react-fine-uploader) provides a number of high and low level components that can be used to render a gallery and various elemeents of an uploader UI.

Unfortunately, this library has no separation of responsibility in terms of rendering components and updating state. Component styling is also extremely opinionated, as you don't get full control over the classes applied without fully overriding the built in css.

For complex UI components, or where you want full control of styling, this becomes quickly unwieldy.

However, `react-fine-uploader` does provide an extremely powerful wrapper for the Fine Uploader library. This wrapper provides features such as the ability to dynamically register multiple event/callback listeners, which this library builds on to instantiate and maintain the redux state.

## Quick Reference
- [Overview](#overview)
   - [Working with `react-fine-uploader`](#wait-but-why-working-with-react-fine-uploader)
- [Basics](#basics)
- [Installing](#installing)
- [Adding uploaders](#adding-uploaders)
- [Accessing state](#accessing-state)
- [Usage examples](#usage-examples)
   - [Filterable file upload table](#filterable-file-upload-table)
- [Working with `react-fine-uploader`](#working-with-react-fine-uploader)

## Basics

Everything is built using ES6 under the airbnb style guide and React 16.

Sorry, I've no time at all to develop and maintain historic compatibilities - you're welcome to submit PRs, provided you're willing and able to commit to ongoing maintenance of the modifications you're making. Best get in touch to discuss this first.

## Installing

Dependencies that you will need to install yourself:
- an A+/Promise spec compliant polyfill (for IE11)
- React (a peer dependency)
- [Fine Uploader](https://github.com/FineUploader/fine-uploader), which is also [available on npm](https://www.npmjs.com/package/fine-uploader)

Do `npm install react-redux-uploader` then see below for adding uploaders.

## Adding and Removing Uploaders

## Accessing State

## Usage Examples

## With great thanks to...

The authors over at `react-fine-uploader` and all the collaborators and authors of the main FineUploader library.

@transitive-bullshit for this [`create-react-library`](https://github.com/transitive-bullshit/create-react-library), a great tool for quickly boilerplating npm modules.

