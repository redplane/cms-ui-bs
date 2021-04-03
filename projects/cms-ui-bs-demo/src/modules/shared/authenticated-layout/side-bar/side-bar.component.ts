import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MessageChannelConstant} from '../../../../constants/message-channel.constant';
import {MessageEventConstant} from '../../../../constants/message-event.constant';
import {INgRxMessageBusService, MESSAGE_BUS_SERVICE_PROVIDER} from 'ngrx-message-bus';
import {ScreenCodes} from '../../../../constants/screen-codes';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ul[id="accordionSidebar"]',
  templateUrl: 'side-bar.component.html'
})
export class SideBarComponent implements OnInit, OnDestroy {

  //#region Properties

  // tslint:disable-next-line:variable-name
  private readonly _subscription: Subscription;

  /*
  * Whether side-bar is toggled or not.
  * */
  // tslint:disable-next-line:variable-name
  private _shouldSideBarHidden = true;

  /*
  * Instance that is used as component class.
  * */
  @HostBinding('class')
  public get hostClass(): string {

    const defaultClasses = ['navbar-nav', 'bg-gradient-primary', 'sidebar', 'sidebar-dark accordion'];
    let finalClasses = [];
    if (this._shouldSideBarHidden) {
      finalClasses = ['toggled'].concat(defaultClasses);
    } else {
      finalClasses = [...defaultClasses];
    }

    return finalClasses.join(' ');
  }

  //#endregion

  //#region Accessors

  public get screenCodes(): typeof ScreenCodes {
    return ScreenCodes;
  }

  //#endregion

  //#region Constructor

  public constructor(@Inject(MESSAGE_BUS_SERVICE_PROVIDER) protected messageBusService: INgRxMessageBusService) {
    this._subscription = new Subscription();
  }

  //#endregion

  //#region Methods

  // Called when component is initialized.
  public ngOnInit(): void {

    // TODO: Listen to side bar
    // Listen to side-bar toggle event in ui channel.
    const hookSidebarDisplaySubscription = this.messageBusService
      .hookMessageChannel(MessageChannelConstant.ui, MessageEventConstant.displaySidebar)
      .subscribe(shouldSideBarVisible => {
        this._shouldSideBarHidden = !shouldSideBarVisible;
        console.log(this._shouldSideBarHidden);
      });

    this._subscription.add(hookSidebarDisplaySubscription);
  }

  public ngOnDestroy(): void {
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  //#endregion

  //#region Methods

  public clickSidebar(): void {
    this.messageBusService.addMessage(MessageChannelConstant.ui, MessageEventConstant.displaySidebar, true);
  }

  //#endregion
}
