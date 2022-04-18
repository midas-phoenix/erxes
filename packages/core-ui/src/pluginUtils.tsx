declare var __webpack_init_sharing__;
declare var __webpack_share_scopes__;
declare var window;

import { IUser } from "modules/auth/types";
import { IItem } from "@erxes/ui-cards/src/boards/types";
import { __ } from "modules/common/utils";
import { ICompany } from "@erxes/ui/src/companies/types";
import { ICustomer } from "@erxes/ui/src/customers/types";
import ErrorBoundary from "@erxes/ui/src/components/ErrorBoundary";
import React from "react";
import { generateRandomColor } from "utils";
import { NavItem } from "modules/layout/components/QuickNavigation";

const PluginsWrapper = ({
  itemName,
  callBack,
  plugins,
}: {
  itemName: string;
  callBack: (plugin: any, item: any) => React.ReactNode;
  plugins: any;
}) => {
  return (plugins || []).map((plugin) => {
    const item = plugin[itemName];

    if (!item) {
      return undefined;
    }

    return callBack(plugin, item);
  });
};

const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

export const loadComponent = (scope, module) => {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");

    const container = window[scope]; // or get the container somewhere else

    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);

    const Module = factory();
    return Module;
  };
};

const renderPlguginSidebar = (itemName: string, type: string, object: any) => {
  const plugins: any[] = (window as any).plugins || [];

  return (
    <PluginsWrapper
      itemName={itemName}
      plugins={plugins}
      callBack={(_plugin, section) => {
        if (!window[section.scope]) {
          return null;
        }

        const Component = React.lazy(
          loadComponent(section.scope, section.component)
        );

        return (
          <Component
            key={Math.random()}
            companyId={object._id}
            mainType={type}
            mainTypeId={object._id}
          />
        );
      }}
    />
  );
};

const System = (props) => {
  if (props.loadScript) {
    const { ready, failed } = useDynamicScript({
      url: props.system && props.system.url,
    });

    if (!props.system || !ready || failed) {
      return null;
    }
  }

  const Component = React.lazy(
    loadComponent(props.system.scope, props.system.module)
  );

  return (
    <ErrorBoundary>
      <React.Suspense fallback="">
        <Component />
      </React.Suspense>
    </ErrorBoundary>
  );
};

class SettingsCustomBox extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { showComponent: false };
  }

  renderComponent = () => {
    if (!this.state.showComponent) {
      return null;
    }

    const { scope, component } = this.props.settingsNav;

    const Component = React.lazy(loadComponent(scope, component));

    return (
      <React.Suspense fallback="">
        <Component />
      </React.Suspense>
    );
  };

  load = () => {
    this.setState({ showComponent: true });
  };

  render() {
    const { renderBox, settingsNav, color, hasComponent } = this.props;

    const box = renderBox(
      settingsNav.text,
      settingsNav.image,
      settingsNav.to,
      settingsNav.action,
      settingsNav.permissions,
      settingsNav.scope,
      color
    );

    if (settingsNav.component && hasComponent) {
      return (
        <div onClick={this.load}>
          {this.renderComponent()}
          {box}
        </div>
      );
    }

    return box;
  }
}

export const pluginsSettingsNavigations = (
  renderBox: (
    name: string,
    image: string,
    to: string,
    action: string,
    permissions?: string[],
    type?: string
  ) => React.ReactNode
) => {
  const plugins: any[] = (window as any).plugins || [];
  const navigationMenus: any[] = [];

  for (const plugin of plugins) {
    for (let i = 0; i < plugins.length; i++) {
      plugin.color = generateRandomColor();
    }

    const hasComponent = Object.keys(plugin.exposes).includes("./settings");

    for (const menu of plugin.menus || []) {
      if (menu.location === "settings") {
        navigationMenus.push(
          <React.Fragment key={menu.text}>
            <SettingsCustomBox
              settingsNav={menu}
              color={plugin.color}
              renderBox={renderBox}
              hasComponent={hasComponent}
            />
          </React.Fragment>
        );
      }
    }
  }

  return navigationMenus;
};

class TopNavigation extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { showComponent: false };
  }

  componentDidMount() {
    const interval = setInterval(() => {
      if (window[this.props.topNav.scope]) {
        window.clearInterval(interval);

        this.setState({ showComponent: true });
      }
    }, 500);
  }

  renderComponent = () => {
    if (!this.state.showComponent) {
      return null;
    }

    const { topNav } = this.props;

    const Component = React.lazy(loadComponent(topNav.scope, topNav.component));

    return (
      <React.Suspense fallback="">
        <Component />
      </React.Suspense>
    );
  };

  render() {
    return <NavItem>{this.renderComponent()}</NavItem>;
  }
}

export const pluginsOfTopNavigations = () => {
  const plugins: any[] = (window as any).plugins || [];
  const topNavigationMenus: any[] = [];

  for (const plugin of plugins) {
    for (const menu of plugin.menus || []) {
      if (menu.location === "topNavigation") {
        topNavigationMenus.push(
          <React.Fragment key={menu.text}>
            <TopNavigation topNav={menu} />
          </React.Fragment>
        );
      }
    }
  }

  return topNavigationMenus;
};

export const pluginLayouts = (currentUser: IUser) => {
  const plugins: any[] = (window as any).plugins || [];
  const layouts: any[] = [];

  for (const plugin of plugins) {
    if (plugin.layout) {
      // const Component = React.lazy(
      //   loadComponent(plugin.scope, plugin.layout)
      // );

      layouts.push(
        <System
          key={Math.random()}
          loadScript={true}
          system={plugin.layout}
          currentUser={currentUser}
        />
      );
    }
  }

  return layouts;
};

export const pluginRouters = () => {
  const plugins: any[] = (window as any).plugins || [];
  const pluginRoutes: any[] = [];

  for (const plugin of plugins) {
    if (plugin.routes) {
      pluginRoutes.push(
        <System key={Math.random()} loadScript={true} system={plugin.routes} />
      );
    }
  }

  return pluginRoutes;
};

export const pluginNavigations = () => {
  const plugins: any[] = (window as any).plugins || [];
  const navigationMenus: any[] = [];

  for (const plugin of plugins) {
    for (const menu of plugin.menus || []) {
      if (menu.location === "mainNavigation") {
        navigationMenus.push(menu);
      }
    }
  }

  return navigationMenus;
};

export const pluginsOfCustomerSidebar = (customer: ICustomer) => {
  return renderPlguginSidebar(
    "customerRightSidebarSection",
    "customer",
    customer
  );
};

export const pluginsOfCompanySidebar = (company: ICompany) => {
  return renderPlguginSidebar("companyRightSidebarSection", "company", company);
};

export const pluginsOfItemSidebar = (item: IItem, type: string) => {
  return renderPlguginSidebar(`${type}RightSidebarSection`, type, item);
};

export const pluginsOfPaymentForm = (
  renderPaymentsByType: (type) => JSX.Element
) => {
  const plugins: any[] = (window as any).plugins || [];

  return (
    <PluginsWrapper
      itemName={"payments"}
      plugins={plugins}
      callBack={(_plugin, payments) => {
        const paymentsTypes: JSX.Element[] = [];
        for (const perPayment of payments) {
          if (perPayment.component) {
            paymentsTypes.push(perPayment.component({ ...perPayment }));
          } else {
            paymentsTypes.push(renderPaymentsByType({ ...perPayment }));
          }
        }
        return paymentsTypes;
      }}
    />
  );
};
