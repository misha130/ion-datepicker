import { App, ModalCmp, ModalOptions, NavOptions, ViewController } from 'ionic-angular';
import { ModalMDSlideIn, ModalMDSlideOut, ModalSlideIn, ModalSlideOut } from 'ionic-angular/components/modal/modal-transitions';

import { Config } from 'ionic-angular/config/config';
import { DatePickerComponent } from './datepicker.component';
import { Injectable } from '@angular/core';
import { PORTAL_MODAL } from 'ionic-angular/components/app/app-constants';
import { isPresent } from 'ionic-angular/util/util';

/**
 * @private
 */
export class DatePickerDisplayer extends ViewController {
    private _app: App;
    private _enterAnimation: string;
    private _leaveAnimation: string;

    constructor(app: App, component: any, data: any, opts: ModalOptions = {}, config: Config) {

        data = data || {};
        data.component = component;
        opts.showBackdrop = isPresent(opts.showBackdrop) ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;

        super(ModalCmp, data, null);
        this._app = app;
        this._enterAnimation = opts.enterAnimation;
        this._leaveAnimation = opts.leaveAnimation;

        this.isOverlay = true;

        config.setTransition('modal-slide-in', ModalSlideIn);
        config.setTransition('modal-slide-out', ModalSlideOut);
        config.setTransition('modal-md-slide-in', ModalMDSlideIn);
        config.setTransition('modal-md-slide-out', ModalMDSlideOut);
    }

    /**
     * @private
     */
    getTransitionName(direction: string): string {
        let key: string;
        if (direction === 'back') {
            if (this._leaveAnimation) {
                return this._leaveAnimation;
            }
            key = 'modalLeave';
        } else {
            if (this._enterAnimation) {
                return this._enterAnimation;
            }
            key = 'modalEnter';
        }
        return this._nav && this._nav.config.get(key);
    }

    /**
     * Present the action sheet instance.
     *
     * @param {NavOptions} [opts={}] Nav options to go with this transition.
     * @returns {Promise} Returns a promise which is resolved when the transition has completed.
     */
    present(navOptions: NavOptions = {}) {
        return this._app.present(this, navOptions, PORTAL_MODAL);
    }
}
@Injectable()
export class DatePickerController {

    constructor(private _app: App, public config: Config) { }
    /**
     * Create a modal to display. See below for options.
     *
     * @param {object} component The Modal view
     * @param {object} data Any data to pass to the Modal view
     * @param {object} opts Modal options
     */
    create(data: any = {}, opts: ModalOptions = {}) {
        data.component = DatePickerComponent;
        opts.showBackdrop = opts.showBackdrop !== undefined ? !!opts.showBackdrop : true;
        opts.enableBackdropDismiss = opts.enableBackdropDismiss !== undefined ? !!opts.enableBackdropDismiss : true;
        data.opts = opts;
        return new DatePickerDisplayer(this._app, data.component, data, opts, this.config);
    }
}
