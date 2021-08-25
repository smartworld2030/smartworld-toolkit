# 🥞 SmartWorld UIkit

[![Version](https://img.shields.io/npm/v/@smartworld-libs/uikit)](https://www.npmjs.com/package/@smartworld-libs/uikit) [![Size](https://img.shields.io/bundlephobia/min/@smartworld-libs/uikit)](https://www.npmjs.com/package/@smartworld-libs/uikit)

SmartWorld UIkit is a set of React components and hooks used to build pages on SmartWorld's apps. It also contains a theme file for dark and light mode.

## Install

`yarn add @smartworld-libs/uikit`

## Setup

### Theme

Before using SmartWorld UIkit, you need to provide the theme file to styled-component.

```
import { ThemeProvider } from 'styled-components'
import { light, dark } from '@smartworld-libs/uikit'
...
<ThemeProvider theme={isDark}>...</ThemeProvider>
```

### Reset

A reset CSS is available as a global styled component.

```
import { ResetCSS } from '@smartworld-libs/uikit'
...
<ResetCSS />
```

### Types

This project is built with Typescript and export all the relevant types.

## How to use the UIkit

If you want to use components from the UIkit, check the [Storybook documentation](https://smartworld.github.io/pancake-uikit/)
