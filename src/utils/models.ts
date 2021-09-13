export type GenderType = 'male' | 'female'

export type PostType = 'QA' | 'DevOps' | '1C' | 'SEO' | 'Back-end' | 'Front-end' | 'SMM' | 'UX/UI'

export type EmploymentType = 'full' | 'part'

export type MemberType = {
  id: string
  fullName: string
  gender: GenderType
  post: PostType
  employment: EmploymentType
  birthDate: number
}
