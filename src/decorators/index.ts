/**
 * @module @adonisjs/fold
 */

/*
* @adonisjs/fold
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import 'reflect-metadata'

/**
 * Injects bindings to the class constructor
 */
export function inject (value?: any) {
  function decorator (target: any, propertyKey: string): void
  function decorator (target: any): void
  function decorator (target: any, propertyKey?: string): void {
    /**
     * Consturctor injections
     */
    if (!propertyKey) {
      target.inject = target.inject || {}
      target.inject.instance = target.inject.instance || []

      const constructorParams = Reflect.getMetadata('design:paramtypes', target)

      if (constructorParams) {
        constructorParams.forEach((param: any, index: number) => {
          if (value && value[index]) {
            target.inject.instance.push(value[index])
          } else {
            target.inject.instance.push(param)
          }
        })
      }
      return
    }

    /**
     * Parameter injections
     */
    target.constructor.inject = target.constructor.inject || {}
    target.constructor.inject[propertyKey] = target.constructor.inject[propertyKey] || []

    const methodParams = Reflect.getMetadata('design:paramtypes', target, propertyKey)
    if (methodParams) {
      methodParams.forEach((param: any, index: number) => {
        if (value && value[index]) {
          target.constructor.inject[propertyKey].push(value[index])
        } else {
          target.constructor.inject[propertyKey].push(param)
        }
      })
    }
  }

  return decorator
}