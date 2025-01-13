import * as React from 'react';
import {Menu} from 'antd';

export default function NestedMenuList({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const items = (menu || FALLBACK_HEADER_MENU).map((item) => {
    if (!item.url) return null;

    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomainUrl)
        ? new URL(item.url).pathname
        : item.url;

    const result =
      item.items.length > 0
        ? {
            key: item.id,
            label: <a href={url}>{item.title}</a>,
            children: item.items.map((subItem) => {
              if (!subItem.url) return null;

              return {
                key: subItem.key,
                label: <a href={subItem.url}>{subItem.title}</a>,
              };
            }),
          }
        : {
            key: item.id,
            label: <a href={url}>{item.title}</a>,
          };

    return result;
  });

  return (
    <Menu
      mode="inline"
      items={items}
      style={{borderInlineEnd: 'none', background: 'transparent'}}
    />
  );
}

const FALLBACK_HEADER_MENU = [
  {
    key: 'gid://shopify/MenuItem/461609500728',
    label: <a href="/collections/all-products">Products</a>,
  },
  {
    key: 'gid://shopify/MenuItem/461609533496',
    label: <a href="/blogs/blog">Blog</a>,
  },
  {
    key: 'gid://shopify/MenuItem/461609566264',
    label: <a href="/policies">Policy</a>,
  },
  {
    key: 'gid://shopify/MenuItem/461609599032',
    label: <a href="/pages/about-us">About</a>,
  },
];
