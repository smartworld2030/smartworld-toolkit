interface INumber {
  EPSILON: number
}
declare let Number: INumber

export default class CircleSliderHelper {
  private stepsArray: number[]

  private stepIndex: number

  private countSteps: number

  constructor(stepsArray: number[], initialValue: number) {
    this.stepsArray = stepsArray
    this.countSteps = this.stepsArray.length - 1
    this.stepIndex = 0
    this.setCurrentStepIndexFromArray(initialValue)
  }

  public getEpsilon = (): number => {
    let e = 1.0
    while (1.0 + 0.5 * e !== 1.0) {
      e *= 0.5
    }
    return e
  }

  public getAngle(): number {
    const accuracy = 0.00001
    const epsilon = Number.EPSILON || this.getEpsilon()
    return Math.min(this.getAnglePoint() * this.stepIndex, 2 * Math.PI - epsilon) - accuracy
  }

  public getCurrentStep(): number {
    return this.stepsArray[this.stepIndex]
  }

  public updateStepIndexFromValue(value: number): void {
    const isSetValue = this.setCurrentStepIndexFromArray(value)
    if (isSetValue) {
      return
    }
    this.stepIndex = this.countSteps
  }

  public updateStepIndexFromAngle(angle: number): void {
    const stepIndex = Math.round(angle / this.getAnglePoint())
    if (stepIndex < this.countSteps) {
      this.stepIndex = stepIndex
      return
    }
    this.stepIndex = this.countSteps
  }

  public setCurrentStepIndexFromArray = (value: number): boolean => {
    for (let i = 0; i < this.countSteps; i++) {
      if (value <= this.stepsArray[i]) {
        this.stepIndex = i
        return true
      }
    }
    this.stepIndex = this.countSteps
    return false
  }

  public getAnglePoint(): number {
    return (Math.PI * 2) / this.countSteps
  }
}
