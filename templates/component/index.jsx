import React from 'react'

import * as styles from './{{componentName}}.{{cssPre}}'

export default class {{componentNameUP}} extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        {{componentName}}
      </div>
    )
  }
}