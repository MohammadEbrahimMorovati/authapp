'use client'

import React, { forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  type?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, type = 'text', ...rest },
  ref
) {
  const classes = `${styles.input__control} ${error ? 'invalid' : ''} ${className ?? ''}`
  return (
    <div className={styles.input}>
      {label && <label className={styles.input__label}>{label}</label>}
      <input ref={ref} type={type} className={classes} {...rest} />
      {error && <span className={styles.input__error}>{error}</span>}
    </div>
  )
})

export default Input