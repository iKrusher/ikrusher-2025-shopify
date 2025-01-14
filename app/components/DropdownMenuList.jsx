import * as React from 'react';
import {Collapse} from 'antd';
import arrowClosedIcon from '~/assets/arrow-closed.svg';
import arrowOpenedIcon from '~/assets/arrow-opened.svg';

export default function DropdownMenuList({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}) {
  const items = (menu || FALLBACK_FOOTER_MENU).map((item) => {
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
            key: item.resourceId,
            label: <a href={url}>{item.title}</a>,
            children: item.items.map((subItem) => {
              if (!subItem.url) return null;

              return (
                <a key={subItem.id} href={subItem.url}>
                  {subItem.title}
                </a>
              );
            }),
          }
        : {
            key: item.id,
            label: <a href={url}>{item.title}</a>,
          };

    return result;
  });

  return (
    <Collapse
      items={items}
      bordered={false}
      expandIcon={({isActive}) =>
        isActive ? (
          <img src={arrowOpenedIcon} alt="iKrusher icon" />
        ) : (
          <img src={arrowClosedIcon} alt="iKrusher icon" />
        )
      }
    />
  );
}

const FALLBACK_FOOTER_MENU = [
  {
    key: 'gid://shopify/MenuItem/461609500728',
    label: <a href="/collections/all-products">Products</a>,
  },
  {
    key: 'gid://shopify/MenuItem/461609533496',
    label: <a href="/blogs/blog">Blogs</a>,
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
