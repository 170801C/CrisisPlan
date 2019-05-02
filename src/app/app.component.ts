import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { LanguagesService } from './services/languages.service';

@Component({
  // CSS selector. Include this in .html as <app-root> to include everything from this component (.ts, .html, .module.ts etc.)
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguagesService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Set the initial app language to be the previously used language
      this.languageService.setInitialAppLanguage();
    });
  }
}

// import { Component, ViewChildren, QueryList } from '@angular/core';
// import { Platform, ModalController, ActionSheetController, PopoverController, IonRouterOutlet, MenuController } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Router } from '@angular/router';
// // import { Toast } from '@ionic-native/toast/ngx';
// import { ToastController } from '@ionic/angular';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html'
// })
// export class AppComponent {

//   // set up hardware back button event.
//   lastTimeBackPress = 0;
//   timePeriodToExit = 2000;

//   @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

//   constructor(
//     private platform: Platform,
//     private splashScreen: SplashScreen,
//     private statusBar: StatusBar,
//     public modalCtrl: ModalController,
//     private menu: MenuController,
//     private actionSheetCtrl: ActionSheetController,
//     private popoverCtrl: PopoverController,
//     private router: Router,
//     // private toast: Toast,
//     public toastController: ToastController
//   ) {

//     // Initialize app
//     this.initializeApp();

//     // Initialize BackButton Eevent.
//     this.backButtonEvent();
//   }

//   initializeApp() {
//     this.platform.ready().then(() => {
//       this.statusBar.styleDefault();
//       this.splashScreen.hide();
//     });
//   }

//   // active hardware back button
//   backButtonEvent() {
//     this.platform.backButton.subscribe(async () => {
//       // close action sheet
//       try {
//         const element = await this.actionSheetCtrl.getTop();
//         if (element) {
//           element.dismiss();
//           return;
//         }
//       } catch (error) {
//       }

//       // close popover
//       try {
//         const element = await this.popoverCtrl.getTop();
//         if (element) {
//           element.dismiss();
//           return;
//         }
//       } catch (error) {
//       }

//       // close modal
//       try {
//         const element = await this.modalCtrl.getTop();
//         if (element) {
//           element.dismiss();
//           return;
//         }
//       } catch (error) {
//         console.log(error);

//       }

//       // close side menua
//       try {
//         const element = await this.menu.getOpen();
//         if (element) {
//           this.menu.close();
//           return;

//         }

//       } catch (error) {

//       }

//       this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
//         if (outlet && outlet.canGoBack()) {
//           outlet.pop();
//           console.log("I have mooooooovved back")

//         }
//         else if (this.router.url === '/tabs') {
//           if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
//             // this.platform.exitApp(); // Exit from app
//             navigator['app'].exitApp(); // work in ionic 4

//           }
//           else {
//             // this.toast.show(
//             //     `Press back again to exit App.`,
//             //     '2000',
//             //     'center')
//             const toast =  this.toastController.create({
//               message: 'Press back again to exit App',
//               duration: 2000
//             })
//             .then((res) => res.present())
//             // toast.present();

//             // .subscribe(toast => {
//             //     // console.log(JSON.stringify(toast));
//             // });
//             console.log("Back pressed")
//             this.lastTimeBackPress = new Date().getTime();

//           }
//         }
//       });
//     });
//   }
// }
