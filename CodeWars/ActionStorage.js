class ActionStorage {
  constructor(object) {
    this.object = object
    this.versions = [{ ...object }]
    this.shift = 0
  }

  fork() {
    this.versions.length = this.currentIndex + 1
    this.versions.push({ ...this.object })
    this.shift = 0
  }

  undo() {
    if (this.shift < (this.versions.length - 1)) {
      this.shift += 1
      this.sync()
    }
  }

  redo() {
    if (this.shift > 0) {
      this.shift -= 1
      this.sync()
    }
  }

  set(key, value) {
    this.object[key] = value
    this.fork()
  }

  get(key) {
    return this.current[key]
  }

  del(key) {
    delete this.object[key]
    this.fork()
  }

  get current() {
    return this.versions[this.currentIndex]
  }

  get currentIndex() {
    return (this.versions.length - 1) - this.shift
  }

  sync() {
    for (const key in this.object) {
      if (Object.hasOwnProperty.call(this.object, key)) {
        delete this.object[key]
      }
    }

    for (const key in this.current) {
      if (Object.hasOwnProperty.call(this.current, key)) {
        this.object[key] = this.current[key]
      }
    }
  }
}