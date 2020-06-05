import React from 'react'
import './NebsForm.css'

export default function NebsForm(props) {
    const { className, ...otherProps } = props
    return (
        <form
            className={['Nebs-form', className].join(' ')}
            action='#'
            {...otherProps}
        />
    )
}