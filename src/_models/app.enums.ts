export enum eOrderFilter {
  ByTheme,
  ByIncrLevel,
  ByDecrLevel,
  Random,
}

export enum eFolderType {
  User = 'USER',
  Trash = 'TRASH',
}

export enum eMemorycardType {
  Classic = 'CLASSIC',
  Qcm = 'QCM',
  Quizz = 'QUIZZ',
}

export enum eMemorycardStatus {
  NotValidated = 'NOTVALIDATED',
  Validated = 'VALIDATED',
  Creation = 'CREATION',
  Pending = 'PENDING',
}

export enum eContentType {
  Text = 'TEXT',
  Image = 'IMAGE',
  Video = 'VIDEO',
  Audio = 'AUDIO',
}
