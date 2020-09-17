import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

const FontColorPicker = ({displayFontPicker, setDisplayFontPicker, colorFontPicker, setColorFontPicker}) => {

  const handleClick = () => {
    setDisplayFontPicker(!displayFontPicker)
  };

  const handleClose = () => {
    setDisplayFontPicker(false)
  };

  const handleChange = (color) => {
    setColorFontPicker(color.rgb)
  };

  const styles = reactCSS({
    'default': {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: `rgba(${ colorFontPicker.r }, ${ colorFontPicker.g }, ${ colorFontPicker.b }, ${ colorFontPicker.a })`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div style={ styles.color } />
      </div>
      { displayFontPicker ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        <SketchPicker color={ colorFontPicker } onChange={ handleChange } />
      </div> : null }
    </div>
  )
}

export default FontColorPicker;
