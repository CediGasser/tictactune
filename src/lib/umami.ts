import { browser } from '$app/environment';

declare global {
  interface Window {
    umami: any;
  }
}

export const trackEvent = (name: string, props?: object) => {
  if (!browser) return;
  if (!window) return;
  if (!window.umami) return;

  if (props) {
    window.umami.track(name, props);
  } else {
    window.umami.track(name);
  }
}
