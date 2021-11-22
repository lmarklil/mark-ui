const isServer = typeof window === "undefined";

function trim(string) {
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
}

export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

export function addClass(el, cls) {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

export function removeClass(el, cls) {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

export function isVisibleInScrollContainer(target, container) {
  if (isServer || !target || !container) return false;

  const elRect = target.getBoundingClientRect();
  let containerRect;

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  // TODO 暂时加入等于条件，待观察是否可行
  return (
    elRect.top <= containerRect.bottom &&
    elRect.bottom >= containerRect.top &&
    elRect.right >= containerRect.left &&
    elRect.left <= containerRect.right
  );
}

export function getScrollDataContainer(el) {
  return el === window ? document.documentElement : el;
}

export function getStyle(el, attr) {
  if (attr === "float") {
    attr = "cssFloat";
  }
  try {
    const style = el.style[attr];
    if (style) return style;
    const computed = document.defaultView.getComputedStyle(el, "");
    return computed ? computed[attr] : "";
  } catch (e) {
    return el.style[attr];
  }
}

export function isVerticalOverflow(el) {
  const scrollDataContainer = getScrollDataContainer(el);
  return scrollDataContainer.scrollHeight > scrollDataContainer.clientHeight;
}

export function isHorizontalOverflow(el) {
  const scrollDataContainer = getScrollDataContainer(el);
  return scrollDataContainer.scrollWidth > scrollDataContainer.clientWidth;
}

export function isOverflow(el) {
  return isVerticalOverflow(el) || isHorizontalOverflow(el);
}

export function isScrollable(el, direction = "") {
  return !!getStyle(el, `overflow${direction}`).match(/(scroll|auto)/);
}

export function isHorizontalScrollable(el) {
  return isScrollable(el, "X");
}

export function isVerticalScrollable(el) {
  return isOverflow(el, "Y");
}

export function getScrollContainer(el) {
  let parent = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScrollable(parent)) {
      return parent;
    }
    parent = parent.parentNode;
  }

  return parent;
}
