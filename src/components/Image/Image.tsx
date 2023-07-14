import React, { CSSProperties, FC, ImgHTMLAttributes, useMemo, useState } from 'react';
import classNames from 'classnames';
import './Image.css';
import { TArticleImage, TExtendedImage } from '@features/articleItem/types';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  skeleton?: boolean;
  data?: TExtendedImage;
  maxWidth?: number;
  autoHeight?: boolean;
}

type TExtendedVariant = TArticleImage & {
  media: string;
};

export const Image: FC<ImageProps> = ({
  className,
  src = '',
  data,
  maxWidth = Number.POSITIVE_INFINITY,
  autoHeight = true,
  alt,
  onLoad,
  skeleton = false,
  ...restProps
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const hasImage = src?.length > 0 || (data && data.source.length > 0);

  const variants: TExtendedVariant[] = useMemo(() => {
    if (!data) {
      return [];
    }
    const variants = data.variants.concat([]).filter((v) => v.width <= maxWidth);
    variants.sort((a, b) => {
      if (a.width === b.width) {
        return a.format < b.format ? 1 : -1;
      }
      return a.width - b.width;
    });
    const lastType = variants.length && variants[variants.length - 1].type;
    return variants.map<TExtendedVariant>((v) => {
      return {
        ...v,
        media: v.type === lastType ? 'all' : `(max-width: ${v.width}px)`,
      };
    });
  }, [data, maxWidth]);

  const mainSrc = useMemo(() => {
    if (src) {
      return src;
    }

    if (variants?.length) {
      const originalJpeg = variants.find((v) => v.type === 'original' && v.format === 'jpeg');
      if (originalJpeg) {
        return originalJpeg.url;
      }

      return variants[variants.length - 1].url;
    }
    return data?.source;
  }, [src, data?.source, variants]);

  const style = useMemo(() => {
    const style: Record<string, CSSProperties> = {};
    if (autoHeight && data && data.variants.length) {
      style['--image-container-height'] = ((100 * variants[0].height) / variants[0].width + 'vw') as CSSProperties;
    }
    if (data?.stripped) {
      style['backgroundImage'] = `url(${data.stripped.url})` as CSSProperties;
    }
    return style;
  }, [data, autoHeight]);

  return (
    <div
      style={style}
      className={classNames(
        'image',
        {
          'image--bg': !!style.backgroundImage,
          'image--loaded': loaded,
          'skeleton-gradient': !style.backgroundImage && (skeleton || (src?.length > 0 && !loaded)),
        },
        className
      )}
    >
      {hasImage && (
        <picture>
          {variants.map((v, i) => {
            return <source key={i} type={`image/${v.format}`} srcSet={v.url} media={`(max-width: ${v.width}px)`} />;
          })}
          <img
            {...restProps}
            className="image__element"
            onLoad={(e) => {
              setLoaded(true);
              onLoad && onLoad(e);
            }}
            src={mainSrc}
            alt={alt}
          />
        </picture>
      )}
    </div>
  );
};
