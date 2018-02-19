import { Component, OnInit, ViewEncapsulation, HostListener, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
//Import all Angular Material Design Components.
import {
  MatDialog,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import { AppStateService } from './services';
import { MenuMock } from './shared/mockdata/menu';
import { SearchMock } from './shared/mockdata/search';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Pyarana';
  //Current Date
  CurrDate = Date.now();

  isDarkTheme = false;
  lastDialogResult: string;
  mode: string;
  value: number;

  foods: any[] = [
    { name: 'Pizza', rating: 'Excellent' },
    { name: 'Burritos', rating: 'Great' },
    { name: 'French fries', rating: 'Pretty good' },
  ];

  public selectedValue: string;

  public games = [
    { value: 'rts-0', viewValue: 'Starcraft' },
    { value: 'rpg-1', viewValue: 'Baldur\'s Gate' },
    { value: 'fps-2', viewValue: 'Doom' }
  ];

  public progress = 0;
  public slider = {
    'autoTicks': false,
    'disabled': false,
    'invert': false,
    'max': 100,
    'min': 0,
    'showTicks': false,
    'step': 1,
    'thumbLabel': false,
    'value': 0,
    'vertical': false,
    'tickInterval': 1,
    'checked': true
  };
  public tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  public color: string;

  public availableColors = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];


  constructor(private appService: AppStateService,
    private _dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private _snackBar: MatSnackBar) {
    // Change your page title here
    appService.getState().topnavTitle = 'Loading';
    this.date = new Date();
    setInterval(() => {
      this.progress = (this.progress + Math.floor(Math.random() * 4) + 1) % 100;
    }, 200);
  }

  openDialog() {
    const dialogRef = this._dialog.open(DialogContentComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  showSnackbar() {
    this._snackBar.open('YUM SNACKS', 'CHEW');
  }
  get tickInterval(): number | 'auto' {
    return this.slider.showTicks ? (this.slider.autoTicks ? 'auto' : this.slider.tickInterval) : null;
  }
  set tickInterval(v) {
    this.slider.tickInterval = Number(v);
  }
















  // Mock Menu
  mainMenu = MenuMock.root;
  // Mock search item
  searchItems = SearchMock.items;
  searchItem: any;
  showTopnavSearch: boolean;
  activeSubMenuName: string;
  date: Date;
  snackBarRef: any;

  
  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    let bodyWidth: number = document.body.clientWidth;
    if (bodyWidth > 960) {
      if (this.appService.getState().sidenavMode !== 'side') {
        this.appService.getState().sidenavOpen = true;
      }
      this.appService.getState().sidenavMode = 'side';
    } else if (bodyWidth <= 960 && bodyWidth > 600) {
      this.appService.getState().sidenavMode = 'push';
      this.appService.getState().sidenavOpen = false;
    } else if (bodyWidth <= 600) {
      this.appService.getState().sidenavMode = 'over';
      this.appService.getState().sidenavOpen = false;
    }
  }

  toggleTopnavSearch() {
    if (this.appService.getState().sidenavMode === 'over') {
      this.showTopnavSearch = false;
    } else {
      this.showTopnavSearch = !this.showTopnavSearch;
    }
  }

  toggleSidenavCollapse() {
    if (this.appService.getState().sidenavCollapse) {
      this.resizeSidenav();
    }
  }

  toggleSidenav() {
    this.appService.getState().sidenavOpen = !this.appService.getState().sidenavOpen;
    this.resizeSidenav();
  }

  closeSidenav() {
    this.appService.getState().sidenavOpen = false;
    this.resizeSidenav();
  }

  openSidenav() {
    this.closeMessagePanel();
    this.appService.getState().sidenavOpen = true;
    this.resizeSidenav();
  }

  resizeSidenav() {
    if (this.appService.getState().sidenavMode === 'side') {
      let resizeEvent = document.createEvent('HTMLEvents');
      resizeEvent.initEvent('resize', true, true);
      document.dispatchEvent(resizeEvent);
    }
  }

  toggleSidenavMenu(menuName: string, isSub: boolean, isParent: boolean) {
    if (isParent) {
      this.activeSubMenuName = this.activeSubMenuName === menuName ? null : menuName;
      return;
    }

    if (isSub) {
      if (this.appService.getState().sidenavMode === 'push' ||
        this.appService.getState().sidenavMode === 'over') {
        this.toggleSidenav();
      }
      return;
    }

    this.activeSubMenuName = null;
    if (this.appService.getState().sidenavMode === 'push' ||
      this.appService.getState().sidenavMode === 'over') {
      this.toggleSidenav();
    }
  }

  toggleMessagePanel() {
    this.appService.getState().messagePanelOpen = !this.appService.getState().messagePanelOpen;
  }

  openMessagePanel() {
    if (this.appService.getState().sidenavMode === 'push' ||
      this.appService.getState().sidenavMode === 'over') {
      this.closeSidenav();
    }
    this.appService.getState().messagePanelOpen = true;
  }

  closeMessagePanel() {
    this.appService.getState().messagePanelOpen = false;
  }

  toggleFullscreen() {
    if (document.fullscreenEnabled) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
    //$(document).toggleFullScreen();
  }

  selectedSearchItem(event) {
    if (this.searchItems) {
      for (let item of this.searchItems) {
        if (item.link === this.searchItem) {
          this.router.navigate([this.searchItem]);
          break;
        }
      }
    }
  }

}

@Component({
  template: `
    <p>This is a dialog</p>
    <p>
      <label>
        This is a text box inside of a dialog.
        <input #dialogInput>
      </label>
    </p>
    <p> <button md-button (click)="dialogRef.close(dialogInput.value)">CLOSE</button> </p>
  `,
})
export class DialogContentComponent {
  constructor(@Optional() public dialogRef: MatDialogRef<DialogContentComponent>) { }
}