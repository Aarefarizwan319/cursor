export const gamepad = {
  handlers: [],
  init(){
    window.addEventListener('gamepadconnected', ()=>{});
    const poll = () => {
      const pads = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(Boolean) : [];
      for (const handler of this.handlers) handler(pads);
      requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  },
  onTick(fn){ this.handlers.push(fn); }
};


