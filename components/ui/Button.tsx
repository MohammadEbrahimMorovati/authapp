'use client'

import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import styles from './Button.module.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, ...rest },
  ref
) {
  return (
    <button ref={ref} className={styles.button} {...rest}>
      {children}
    </button>
  )
})

export default Button