import { App, ModalOptions, NavOptions, ViewController } from 'ionic-angular';
import { ModalCmp } from './modal.component';
import { ModalMDSlideIn, ModalMDSlideOut, ModalSlideIn, ModalSlideOut } from 'ionic-angular/components/modal/modal-transitions';
import { DatePickerDisplayer } from './datepicker.displayer';
import { Config } from 'ionic-angular/config/config';
import { DatePickerComponent } from './datepicker.component';
import { Injectable } from '@angular/core';
import { PORTAL_MODAL } from 'ionic-angular/components/app/app-constants';
import { isPresent } from 'ionic-angular/util/util';

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
