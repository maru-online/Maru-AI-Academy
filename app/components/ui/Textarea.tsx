import React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  fullWidth?: boolean
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  const widthClass = fullWidth ? 'w-full' : ''
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-lg border 
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-200'}
          focus:ring-2 transition-colors
          placeholder:text-gray-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export default Textarea
