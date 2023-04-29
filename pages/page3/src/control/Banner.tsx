import { PropsWithChildren } from 'react';
import { Block, BlockProps, BlockTagType } from 'react-login-page';

export const Banner = <T extends BlockTagType = 'div'>(props: PropsWithChildren<Partial<BlockProps<T>>>) => {
  const { keyname = 'banner', name = 'banner', className, ...elmProps } = props;
  return <Block {...elmProps} name={keyname || name} className={`login-page3-banner ${className || ''}`} />;
};