import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Trabajando juntos',
    Svg: require('@site/static/img/undraw_emails_re_cqen.svg').default,
    description: (
      <>
        Ofrecemos un servicio de envío de cupones por WhatsApp a clientes de
        comercios locales.
      </>
    )
  },
  {
    title: '¿Por qué qrupones?',
    Svg: require('@site/static/img/undraw_visual_data_re_mxxo.svg').default,
    description: (
      <>
        El objetivo es aumentar la recompra de los clientes y generar mayores
        ventas para los comercios participantes.
      </>
    )
  },
  {
    title: 'Enfoque',
    Svg: require('@site/static/img/undraw_shopping_app_flsj.svg').default,
    description: (
      <>
        Nos enfocaremos en comercios locales, como tiendas de ropa, salones de
        belleza, restaurantes, entre otros.
      </>
    )
  }
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container' style={{ marginTop: '2rem' }}>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
