<a href="http://fineuploader.com">
   <img src="https://cdn.worldvectorlogo.com/logos/react.svg" height="64">
   <img src="https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L5K1I1WsuQMZ8ecEuWg%2Favatar.png?generation=1518623866348435&alt=media" height="64">
   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Wc1n4yD3zD7zmXE6NaZDwUXwV8JMPcoMrc8FcbqceY0glqgkDg" height="64">
</a>

[![npm](https://img.shields.io/npm/v/react-redux-uploader.svg)](https://www.npmjs.com/package/react-redux-uploader)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)
[![Build Status](https://travis-ci.org/thclark/react-redux-uploader.svg?branch=master)](https://travis-ci.org/thclark/react-redux-uploader)

Uses a [redux]() store to keep track of one or more [Fine Uploader](http://fineuploader.com) instances in a React app.

Allows you to build any file uploader UI imaginable
With an always-up-to-data and mappable state, you can tie any component to the upload progress, control the uploader via actions, reducers or in sagas. 
Drop-in high-level components for a turn-key UI. Use small focused components to build a more custom UI.

## Overview

### Working with `react-fine-uploader`  

[`react-fine-uploader`](https://github.com/FineUploader/react-fine-uploader) provides a number of high and low level components that can be used to render a gallery and various elemeents of an uploader UI.

Unfortunately, this library has no separation of responsibility in terms of rendering components and updating state. Component styling is also extremely opinionated, as you don't get full control over the classes applied without fully overriding the built in css.
For complex UI components, or where you want full control of styling, this becomes quickly unwieldy. 

However, `react-fine-uploader` provides an extremely useful and powerful wrapper for a Fine Uploader instance. This provides features such as the ability to dynamically register multiple event/callback listeners, and is used heavily by this library under the hood to update and maintain the redux state, hance the dependency.

Components from `react-fine-uploader` can be imported and used with `uploader` instances from the redux state created when you're using this library, so it's drop-in compatible. 


## Quick Reference

- [Installing](#installing)
- [Adding uploaders](#adding-uploaders)
- [Usage examples](#usage-examples)
   - [`<CancelButton />`](#cancelbutton-)
   - [`<DeleteButton />`](#deletebutton-)
   - [`<Dropzone />`](#dropzone-)
   - [`<FileInput />`](#fileinput-)
   - [`<Filename />`](#filename-)
   - [`<Filesize />`](#filesize-)
   - [`<PauseResumeButton />`](#pauseresumebutton-)
   - [`<ProgressBar />`](#progressbar-)
   - [`<RetryButton />`](#retrybutton-)
   - [`<Status />`](#status-)
   - [`<Thumbnail />`](#thumbnail-)

## Installing

Two dependencies that you will need to install yourself: an A+/Promise spec compliant polyfill (for IE11) and React (which is a peer dependency). Simply `npm install react-fine-uploader` and see the documentation for your specific integration instructions (based on your needs). You will also need to install [Fine Uploader](https://github.com/FineUploader/fine-uploader) as well, which is also [available on npm](https://www.npmjs.com/package/fine-uploader).

## Adding Uploaders

## Usage Examples
