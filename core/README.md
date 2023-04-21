<!--rehype:ignore:start-->
<br />
<br />
<br />
<br />
<br />
<p align="center">
  <a href="https://uiwjs.github.io/react-login-page">
    <img alt="react-codemirror logo" src="https://uiwjs.github.io/react-login-page/logo.svg">
  </a>
</p>
<h3 align="center">React Login Pages</h3>
<br />
<br />
<p align="center">
  <a href="https://www.npmjs.com/package/react-login-page" target="__blank">
    <img alt="Downloads" src="https://img.shields.io/npm/dm/react-login-page.svg?style=flat">
  </a>
  <a href="https://www.jsdelivr.com/package/npm/react-login-page" target="__blank">
    <img alt="jsDelivr CDN" src="https://data.jsdelivr.com/v1/package/npm/react-login-page/badge?style=rounded" />
  </a>
  <a href="https://bundlephobia.com/package/react-login-page" target="__blank">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/react-login-page">
  </a>
  <br />
  <a href="https://github.com/uiwjs/react-login-page/actions/workflows/main.yml" target="__blank">
    <img alt="Build & Deploy" src="https://github.com/uiwjs/react-login-page/actions/workflows/main.yml/badge.svg" />
  </a>
  <a href="https://uiwjs.github.io/npm-unpkg/#/pkg/react-login-page/file/README.md" target="__blank">
    <img src="https://img.shields.io/badge/Open%20in-unpkg-blue" alt="Open in unpkg">
  </a>
  <a href="https://www.npmjs.com/package/react-login-page" target="__blank">
    <img alt="npm version" src="https://img.shields.io/npm/v/react-login-page.svg">
  </a>
</p>

<br />
<br />
<br />

<!--rehype:ignore:end-->

Getting Started
===

Encapsulated login page components based on `react-login-page` basic components are provided for quick installation and use. These components help streamline the process of creating login pages and offer flexible APIs for modifying and packaging these components.

## React Login Page

This component is designed to facilitate the development of additional login pages and offers a highly flexible API for modifying packaged login page components.

### Install

```bash
npm install react-login-page --save
```

### Usage

```jsx mdx:preview
import React from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo';

const Demo = () => {
  return (
    <Login>
      <Render>
        {({ fields, buttons, blocks }) => {
          return (
            <div>
              <header>{blocks.logo} {blocks.title}</header>
              <div>
                <label>{fields.username}</label>
              </div>
              <div>
                <label>{fields.password}</label>
              </div>
              <div>
                {buttons.submit}
                {buttons.reset}
              </div>
            </div>
          );
        }}
      </Render>
      <Login.Block name="logo" tagName="span">
        <Logo />
      </Login.Block>
      <Login.Block name="title" tagName="span">Login</Login.Block>
      <Login.Input name="username" placeholder="Please input Username" />
      <Login.Input name="password" placeholder="please enter password" />
      <Login.Button name="submit" type="submit">Submit</Login.Button>
      <Login.Button name="reset" type="reset">Reset</Login.Button>
    </Login>
  );
}
export default Demo;
```

Change the control order by using `index`, Provide more flexible API encapsulation.

```jsx mdx:preview
import React from 'react';
import Login, { Render } from 'react-login-page';
import Logo from 'react-login-page/logo-rect';

const Demo = () => {
  return (
    <Login>
      <Render>
        {({ blocks }, { fields, buttons }) => {
          return (
            <div>
              <header>{blocks.logo} {blocks.title}</header>
              {fields.sort((a, b) => a.index - b.index).map((item, idx) => {
                return (
                  <div key={item.name + idx}>
                    <label>{item.children}{item.children?.props?.extra}</label>
                  </div>
                );
              })}
              <div>
                {buttons.sort((a, b) => a.index - b.index).map((item, idx) => {
                  return React.cloneElement(item.children, {
                    ...item.props,
                    key: item.name + idx,
                  })
                })}
              </div>
            </div>
          );
        }}
      </Render>
      <Login.Block name="logo" tagName="span">
        <Logo />
      </Login.Block>
      <Login.Block name="title" tagName="span">Login</Login.Block>
      <Login.Textarea name="note"></Login.Textarea>
      <Login.Select name="select" defaultValue="1" >
        <option value="w">Choose an item...</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
      </Login.Select>
      <Login.Input name="checkbox" type="checkbox" index={3} extra={<span> Remember me </span>} />
      <Login.Input name="username" index={1} placeholder="Please input Username" />
      <Login.Input name="password" index={0} placeholder="please enter password" />
      <Login.Button name="submit" index={1} type="submit">Submit</Login.Button>
      <Login.Button name="reset" index={0} type="reset">Reset</Login.Button>
    </Login>
  );
}
export default Demo;
```

### `Logo`

There are two default logos built-in, with a special way to import them. See below for reference:

```tsx
import Logo from 'react-login-page/logo';
import Logo from 'react-login-page/logo-rect';
```

⚠️ If you don't use them, they won't be packaged.

### `Login.Block`

```jsx
import Login, { Block } from 'react-login-page';

<Login.Block name="title">Login</Login.Block>
<Block name="title">Login</Block>
```

```jsx
import { PropsWithChildren, AllHTMLAttributes } from 'react';
import { BlockTagType } from 'react-login-page';

export interface BlockProps<Tag extends BlockTagType> extends AllHTMLAttributes<Tag> {
  name?: string;
  /** Can be shown or hidden with controls */
  visible?: boolean;
  /** "index" refers to the use of indexes to control the order of controls, which can provide more flexible API encapsulation. */
  index?: number;
  /** custom created element */
  tagName?: Tag;
}
export declare const Block: {
  <Tag extends keyof JSX.IntrinsicElements = "div">(props: PropsWithChildren<Partial<BlockProps<Tag>>>): null;
  displayName: string;
};
```

### `Login.Input`

```jsx
import Login, { Input } from 'react-login-page';

<Login.Input type="password" placeholder="Password" />
<Input type="password" placeholder="Password" />
```

```tsx
import React, { FC, PropsWithChildren } from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  /** Used to define the name of form controls */
  rename?: string;
  /** Can be shown or hidden with controls */
  visible?: boolean;
  /** "index" refers to the use of indexes to control the order of controls, which can provide more flexible API encapsulation. */
  index?: number;
}
export declare const Input: FC<PropsWithChildren<InputProps>>;
```

### `Login.Textarea`

```jsx
import Login, { Textarea } from 'react-login-page';

<Login.Textarea name="note" />
<Textarea name="note" />
```

```ts
import React, { FC, PropsWithChildren } from 'react';
export interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  /** Used to define the name of form controls */
  rename?: string;
  /** Can be shown or hidden with controls */
  visible?: boolean;
  /** "index" refers to the use of indexes to control the order of controls, which can provide more flexible API encapsulation. */
  index?: number;
}
export declare const Textarea: FC<PropsWithChildren<TextareaProps>>;
```

### `Login.Select`

```jsx
import Login, { Select } from 'react-login-page';

<Login.Select name="selectname">
  <option value="1">One</option>
  <option value="2">Two</option>
</Login.Select>

<Select name="selectname">
  <option value="1">One</option>
  <option value="2">Two</option>
</Select>
```

```ts
import React, { FC, PropsWithChildren } from 'react';
export interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  name?: string;
  /** Used to define the name of form controls */
  rename?: string;
  /** Can be shown or hidden with controls */
  visible?: boolean;
  /** "index" refers to the use of indexes to control the order of controls, which can provide more flexible API encapsulation. */
  index?: number;
}
export declare const Select: FC<PropsWithChildren<SelectProps>>;
```

### `Login.Button`

```jsx
import Login, { Button } from 'react-login-page';

<Login.Button name="submit" type="submit" />
<Button name="submit" type="submit" />
```

```jsx
import { FC, PropsWithChildren } from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  /** Can be shown or hidden with controls */
  visible?: boolean;
  /** "index" refers to the use of indexes to control the order of controls, which can provide more flexible API encapsulation. */
  index?: number;
}
export declare const Button: FC<PropsWithChildren<ButtonProps>>;
```

### `Render`

```jsx
import { Render } from 'react-login-page';

<Render>
  {({ fields, buttons, blocks }) => {
    return (
      <div>
        <header>{blocks.logo} {blocks.title}</header>
        <label>{fields.username}</label>
        <label>{fields.password}</label>
        <div>
          {buttons.submit}
          {buttons.reset}
        </div>
      </div>
    );
  }}
</Render>
```

```tsx
import { FC } from 'react';
import { RenderStateProps, InitialState } from 'react-login-page';
export type RenderChildren = {
  children?: (props: Required<RenderStateProps>, data: InitialState['data']) => React.ReactNode;
} | {
  children?: React.ReactNode;
};
export declare const Render: FC<RenderChildren>;
```

`index` refers to the use of indexes to control the order of controls

```tsx
<Render>
  {({ blocks }, { fields, buttons }) => {
    return (
      <div>
        <header>{blocks.logo} {blocks.title}</header>
        {fields.sort((a, b) => a.index - b.index).map((item, idx) => {
          return <label key={item.name + idx}>{item.children}</label>
        })}
        <div>
          {buttons.sort((a, b) => a.index - b.index).map((item, idx) => {
            const child = item.children;
            if (!isValidElement(child)) return null;
            return cloneElement(child, {
              ...child.props,
              key: item.name + idx,
            })
          })}
        </div>
      </div>
    );
  }}
</Render>
```

### `useStore`

```jsx mdx:preview
import React from 'react';
import Login, { Render, Provider, Container, useStore } from 'react-login-page';

const RenderLoginPage = () => {
  const { fields, buttons, blocks } = useStore();
  return (
    <Render>
      <header>{blocks.logo} {blocks.title}</header>
      <label>{fields.username}</label>
      <label>{fields.password}</label>
      <div>
        {buttons.submit}
        {buttons.reset}
      </div>
    </Render>
  );
}

const Demo = () => {
  return (
    <Provider>
      <Container>
        <RenderLoginPage />
      </Container>
      <Login.Block name="logo" tagName="span">⚛️</Login.Block>
      <Login.Block name="title" tagName="span">Login</Login.Block>
      <Login.Input name="username" placeholder="Please input Username" />
      <Login.Input name="password" placeholder="please enter password" />
      <Login.Button name="submit" type="submit">Submit</Login.Button>
      <Login.Button name="reset" type="reset">Reset</Login.Button>
    </Provider>
  );
}

export default Demo;
```

`index` refers to the use of indexes to control the order of controls

```jsx mdx:preview
import React, { isValidElement, cloneElement } from 'react';
import Login, { Render, Provider, Container, useStore } from 'react-login-page';

const RenderLoginPage = () => {
  const { blocks, data  } = useStore();
  const { fields, buttons } = data;
  return (
    <Render>
      <header>{blocks.logo} {blocks.title}</header>
      {fields.sort((a, b) => a.index - b.index).map((item, idx) => {
        return <label key={item.name + idx}>{item.children}</label>
      })}
      <div>
        {buttons.sort((a, b) => a.index - b.index).map((item, idx) => {
            const child = item.children;
            if (!isValidElement(child)) return null;
            return cloneElement(child, {
              ...child.props,
              key: item.name + idx,
            })
        })}
      </div>
    </Render>
  );
}

const Demo = () => {
  return (
    <Provider>
      <Container>
        <RenderLoginPage />
      </Container>
      <Login.Block name="logo" tagName="span">⚛️</Login.Block>
      <Login.Block name="title" tagName="span">Login</Login.Block>
      <Login.Input name="username" index={1} placeholder="Please input Username" />
      <Login.Input name="password" placeholder="please enter password" />
      <Login.Button name="submit" index={1} type="submit">Submit</Login.Button>
      <Login.Button name="reset" type="reset">Reset</Login.Button>
    </Provider>
  );
}

export default Demo;
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-login-page/graphs/contributors">
  <img src="https://uiwjs.github.io/react-login-page/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

Licensed under the MIT License.