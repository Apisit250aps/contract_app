import HeroLayout from "../layouts/HeroLayout"
export default function Index() {
  return (
    <>
      <HeroLayout>
        <h1 className="text-5xl font-bold">Hello there</h1>
        <p className="py-6">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </HeroLayout>
    </>
  )
}
