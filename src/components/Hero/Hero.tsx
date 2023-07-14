import React from 'react';
import './Hero.css';
import classNames from 'classnames';
import { Title } from '@components/Title/Title';
import { Image } from '@components/Image/Image';
import { TExtendedImage } from '@features/articleItem/types';

interface HeroProps {
  image?: TExtendedImage | string;
  title: string;
  text?: string;
  className?: string;
  autoHeight?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ image, title, text = '', className, autoHeight }) => {
  const hasSimpleImage = typeof image === 'string' && image.length > 0;
  const hasExtendedImage = typeof image === 'object' && image.source.length > 0;

  return (
    <section
      className={classNames(
        'hero',
        {
          'hero--no-image': !hasSimpleImage && !hasExtendedImage,
        },
        className
      )}
    >
      <div className="hero__in">
        {hasSimpleImage && <Image src={image} className="hero__image" alt={title} />}
        {hasExtendedImage && <Image data={image} autoHeight={autoHeight} className="hero__image" alt={title} />}
        <div className="hero__container container">
          <div className="hero__content">
            <Title className="hero__title">{title}</Title>
            {text.length > 0 && <p className="hero__text">{text}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};
