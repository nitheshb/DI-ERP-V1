import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react'

import ReactCanvasConfetti from 'react-canvas-confetti'

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 5,
    startVelocity: 0,
    ticks: 200,
    gravity: 1,
    origin: {
      x: Math.random(),
      y: Math.random() * 0.999 - 0.2,
    },
    // choose different colors
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],

    scalar: randomInRange(0.2, 1),
  }
}

const Confetti = forwardRef((props, ref) => {
  const refAnimationInstance = useRef(null)
  const [intervalId, setIntervalId] = useState()

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0))
      refAnimationInstance.current(getAnimationSettings(120, 1))
    }
  }, [])

  const fire = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16))
      setTimeout(() => {
        clearInterval(intervalId)
        setIntervalId(null)
      }, 5000)
    }
  }, [nextTickAnimation, intervalId])

  useEffect(() => {
    return () => {
      clearInterval(intervalId)
    }
  }, [intervalId])

  useImperativeHandle(ref, () => ({
    fire,
  }))

  return (
    <>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  )
})

export default Confetti
