class VersionStorage {
  constructor(initObject) {
    this.versions = [initObject]
    this.shift = 0
  }

  fork() {
    const forkedStorage = { ...this.current }
    this.versions.push(forkedStorage)
    return forkedStorage
  }

  undo() {
    if (this.shift < (this.versions.length - 1)) {
      this.shift += 1
    }
  }

  redo() {
    if (this.shift > 0) {
      this.shift -= 1
    }
  }

  set(key, value) {
    const forkedStorage = this.fork()
    forkedStorage[key] = value
  }

  get(key) {
    return this.current[key]
  }

  del(key) {
    const forkedStorage = this.fork()
    delete forkedStorage[key]
  }

  get current() {
    return this.versions[(this.versions.length - 1) - this.shift]
  }
}