import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAuth } from "../lib/auth"

export default function Home() {

  const auth = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Quick Feedback
        </h1>
        <div>
          { auth?.user?.email}
        </div>
        <button onClick={(e) => auth.signInWithGithub()}> Sign in</button>
        {auth?.user && (
          <button onClick={ (e) => auth.signout()}>Sign out</button>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
