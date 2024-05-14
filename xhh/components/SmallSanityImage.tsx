import { ReactElement } from 'react';
import Image from 'next/image';
import { getImageDimensions } from '@sanity/asset-utils';
import { urlFor } from '../lib/sanity';

export const SmallIdealImage = ({ image }: { image: any }): ReactElement => {
  const alt = image?.alt ?? "An image without an alt, whoops";

  return (
    <div>
      {image?.asset && (
        <Image
          src={urlFor(image).url()}
          alt={alt}
          width={250}
          height={getImageDimensions(image).height}
          placeholder="blur"
          blurDataURL={urlFor(image).width(24).height(24).blur(0).url()}

          className='object-cover h-[80px] max-w-[125px]'
        />
      )}
    </div>
  );
};