import React from 'react'
import styles from "./Logo.module.css"

type LogoProps = {

};

const Logo: React.FC<LogoProps> = () => {
  return (
    <div className="logoContainer">
        <img src="/logo.svg" alt="image"/>
    </div>
  )
}

export default Logo
