import React, { FC, HTMLAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import './ModalWrapper.css';
import { CSSTransition } from 'react-transition-group';

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end';
  alignY?: 'start' | 'center' | 'end';
  onClose: VoidFunction;
  shown: boolean;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onClose,
  shown,
  ...restProps
}: ModalWrapperProps) => {
  useEffect(() => {
    if (shown) {
      document.documentElement.classList.add('--prevent-scroll');
    }

    return () => {
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, [shown]);

  useEffect(() => {
    const documentKeyDownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', documentKeyDownListener);
    return () => {
      document.removeEventListener('keydown', documentKeyDownListener);
    };
  }, [onClose]);

  return createPortal(
    <CSSTransition
      in={shown}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={300}
      classNames="modal-wrapper-animation"
    >
      <div
        className={classNames(
          'modal-wrapper',
          `modal-wrapper--alignY-${alignY}`,
          `modal-wrapper--alignX-${alignX}`,
          className
        )}
        onClick={onClose}
        {...restProps}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="modal-wrapper__children"
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement
  );
};
