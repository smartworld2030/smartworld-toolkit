export default class MouseHelper {
  private container: SVGSVGElement | undefined

  private center!: number

  private relativeX!: number

  private relativeY!: number

  constructor(container: SVGSVGElement | null) {
    if (!container) return
    this.container = container
    this.setPosition({ clientX: 0, clientY: 0 } as Touch)
  }

  public setPosition(event: Touch | MouseEvent | null): void {
    if (!this.container || !event) {
      return
    }
    const rectSize = this.container.getBoundingClientRect()
    const { width } = rectSize
    this.center = width / 2
    this.relativeX = event.clientX - rectSize.left
    this.relativeY = event.clientY - rectSize.top
  }

  public getNewSliderAngle(): number {
    const angleBetweenTwoVectors = Math.atan2(this.relativeY - this.center, -this.relativeX + this.center)
    return (-angleBetweenTwoVectors + Math.PI * 1.5) % (Math.PI * 2)
  }
}
