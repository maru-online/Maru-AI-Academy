import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  noPadding?: boolean
  variant?: 'default' | 'glass' | 'gradient'
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  noPadding = false,
  variant = 'default',
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300'
  
  const variantClasses = {
    default: 'bg-white shadow-lg',
    glass: 'bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg',
  }
  
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1' : ''
  const paddingClasses = noPadding ? '' : 'p-6'
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${paddingClasses} ${className}`}>
      {children}
    </div>
  )
}

export default Card
