---
title: "React Native - Navigator 導覽換頁"
subtitle: "react native navigator 快速建立換頁功能。"
date: "2016-09-21T00:00:00.000Z"
series: "reactnative"
tags: "navigator","react","reactnative"
image: ""
--- 

**react native navigator 快速建立換頁功能。**

在 react native 中，換頁是不可或缺的功能，

Navigator 即為我們主要使用的原件，

以下步驟將實作出簡單的換頁功能，並且於 app 頂端有導覽列。

引用元件
----

```javascript
import {
  AppRegistry,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Navigator,
  View,
  Text,
} from 'react-native';
```

*   Platform：可辨別裝置為 ios 或 android
*   TouchableOpacity：提供點擊事件 onPress()
*   StyleSheet：樣式表
*   Navigator：導覽列（本文主要元件）

建立導覽框架
------

Component：appdemo

```javascript
class appdemo extends Component {

  _renderScene(route, navigator) {
     // page router
     if (route.component == Main) {
       return <Main navigator={navigator} />
     }
     if (route.component == Home) {
       return <Home navigator={navigator} />
     }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ component: Main }}
        renderScene={ this._renderScene } />
    );
  }

}
```

*   initialRoute：設定預設的 component
*   renderScene：於換頁時 push component，並依據指定的 component，來載入

 Component：Main

```javascript
class Main extends Component {
  _navigate() {
    this.props.navigator.push({
      component: Home,
    })
  }
  render() {
    return (
      <View>
        <Text>this is Main Page</Text>
        <TouchableOpacity onPress= { () => this._navigate() } >
          <Text>GO To Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

*   \_navigate()：透過 onPress 事件，將 navigator push；換到哪一頁，則用 component 來指定欲載入之元件

Component：Home

```javascript
class Home extends Component {
  _back() {
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.content}>
        <Text>this is Home Page</Text>
        <TouchableOpacity onPress= { () => this._back() } >
          <Text>GO Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

*    \_back：若要返回上一頁，則用 navigator.pop() 

 StyleSheet：styles

```javascript
const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
```

AppRegistry：appdemo

```javascript
AppRegistry.registerComponent('appdemo', () => appdemo);
```

修改 \_renderScene()
------------------

在辨別 route 時候，我們用 if 來決定要載入的 component，

但如果今天頁數眾多，將會出現疊羅漢般的 if，

因此我們將原本寫法變更，將取得之元件，以變數形式載入。

```javascript
_renderScene(route, navigator) {

    // 方法一: 用 if 方式選擇 route
    // if (route.component == Main) {
    //   return <Main navigator={navigator} />
    // }
    // if (route.component == Home) {
    //   return <Home navigator={navigator} />
    // }

    // 方法二: 直接把傳來的 component 用變數表示
    let Component = route.component;
    return (
      <Component navigator={navigator}  />
    );

}
```

修改換頁動畫 Navigator
----------------

在 render Navigator 中我們增加 configureScene ，此可設定頁面滑動的方式（上下、左右）。

```javascript
render() {
    return (
      <Navigator
        initialRoute={{ component: Main }}
        renderScene={ this._renderScene }
        configureScene={ this._configureScene } />
    );
```

相對的也建立 \_configureScene。

```javascript
_configureScene(route, routeStack) {
    // 頁面滑動方式
    return Navigator.SceneConfigs.FloatFromBottom
    //return Navigator.SceneConfigs.PushFromRight
  }
```

*   FloatFromBottom：由下至上滑入
*   PushFromRight：由右往左滑入

增加上方導覽列
-------

在上步驟同樣位置，我們增加 navigationBar，為了調整間距，也增加 sceneStyle。

```javascript
render() {
    return (
      <Navigator
        initialRoute={{ component: Main }}
        renderScene={ this._renderScene }
        configureScene={ this._configureScene }
        sceneStyle={{ paddingTop: (Platform.OS === 'android' ? 66 : 74) }}
        navigationBar={this._renderNavBar() } />
    );
```

建立 \_renderNavBar()。

```javascript
_renderNavBar() {
    const styles = {
      title: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      button: {
        flex: 1, width: 80, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '400'
      }
    }

    var routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if (index > 0) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop() }
              style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop() }
              style={styles.button}>
              <Text style={styles.buttonText}>Logo</Text>
            </TouchableOpacity>
          );
        }
      },
      RightButton(route, navigator, index, navState) {
        if (index > 0 && route.rightButton) {
          return (
            <TouchableOpacity
              style={styles.button}>
              <Text style={styles.buttonText}>Set</Text>
            </TouchableOpacity>
          );
        } else {
          return null
        }

      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.title}>
            <Text style={styles.buttonText}>{route.title ? route.title : 'Home'}</Text>
          </View>
        );
      }
    };

    return (
      <Navigator.NavigationBar
        style={{
          alignItems: 'center',
          backgroundColor: '#55ACEE',
        }}
        routeMapper={routeMapper}
        />
    );
  }
```

*   在 routerＭapper 中，將設定三種 button 事件以及樣式
*   LeftButton：左側按鈕，通常表示 logo 或是 back（返回）
*   RightButton：右側按鈕，通常表示 setting 設定
*   Title：位於 LeftButton 右側，通常表示當前畫面標題

在頁面中傳入參數 Props
--------------

若要在 Main 頁面傳入參數至 Home 頁面參數，必須先修改 \_renderScene()。

Component：appdemo

```javascript
_renderScene(route, navigator) {

    let Component = route.component;
    return (
      <Component navigator={navigator} {...route.passProps}  />
    );

  }
```

*   在這邊我們追加 { ...route.passProps }，於每個 component 進行 props

Component：Main

```javascript
class Main extends Component {
  _navigate(property) {
    this.props.navigator.push({
      component: Home,
      passProps: {
        name: property
      }
    })
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress= { () => this._navigate('Hello World') } >
          <Text>GO To View</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

*   \_navigate()：在裡面加入參數文字 Hello World
*   navigator.push：在換頁的時候，將我們剛剛新增的 passProps，新增參數名稱 name（自訂），並傳入 property

在頁面中接收參數 Props
--------------

上步驟我們完成了參數之傳遞，接下來要在 Home 這一頁進行接收並顯示。

Component：Home

```javascript
class Home extends Component {
  _back(property) {
    this.props.navigator.pop();
  }
  render() {

    const { name } = this.props;

    return (
      <View style={styles.content}>
        <Text>{name}</Text>
        <TouchableOpacity onPress= { () => this._back() } >
          <Text>GO To View</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

*   name：由 this.props 可接收 passProps 所有參數，在剛剛我們於 passProps 加入 name，故直接 const { name } 取之。
*   完成後即可看到 Hello World 

以上為參考來源之簡易介紹！

參考資料：[React Native Navigator — Navigating Like A Pro in React Native](https://medium.com/@dabit3/react-native-navigator-navigating-like-a-pro-in-react-native-3cb1b6dc1e30#.jstcmhp2g) 

有勘誤之處，不吝指教。ob'\_'ov