import { MemcardObj } from "src/models/business/memcard.model";

// RunAppState Store
export class RunAppState {
  constructor(
    public wasRunning: boolean,
    public runningUserID: string | null,
    public runState: string | null
  ) {}

  static createDefault(): RunAppState {
    return new RunAppState(false, null, null);
  }
}

// ManageContent Store
export class ManageContent {
  constructor(
    public unsavedMemcard: MemcardObj | null,
    public unsavedThemeName: string | null
  ) {}

  static createDefault(): ManageContent {
    return new ManageContent(null, null);
  }
}

// AppState Store
export class AppState {
  constructor(
    public selectedUser: number,
    public lastSelectedUser: number,
    public lastUserPosition: string
  ) {}

  static createDefault(): AppState {
    return new AppState(0, 0, 'oui');
  }
}
