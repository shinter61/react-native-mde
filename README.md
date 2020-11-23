# react-native-mde
`react-native-mde` is library for markdown editor using on react native.

## Installation

npm

```
npm install --save react-native-mde
```

yarn

```
yarn add react-native-mde
```

## Usage

```js
import React from 'react'
import MarkdownEditor from 'react-native-mde'

const Hoge = () => {
  const [text, setText] = React.useState('')
  return (
    <MarkdownEditor
      text={text}
      setText={setText}
      placeholder={'Whats up?'}
    />
  )
}
```
