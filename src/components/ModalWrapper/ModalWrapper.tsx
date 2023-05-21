import React, { FC, HTMLAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import './ModalWrapper.css';

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end';
  alignY?: 'start' | 'center' | 'end';
  onClose: VoidFunction;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onClose,
  ...restProps
}: ModalWrapperProps) => {
  useEffect(() => {
    document.documentElement.classList.add('--prevent-scroll');

    return () => {
      document.documentElement.classList.remove('--prevent-scroll');
    };
  }, []);

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
    </div>,
    document.getElementById('overlay') as HTMLElement
  );
};
