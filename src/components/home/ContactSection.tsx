import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/Button'
import { submitContactRequest } from '../../lib/supabase'
import { toast } from 'react-hot-toast'

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contact
        </motion.h2>
        <ContactForm />
      </div>
    </section>
  )
}

const schema = z.object({
  name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(1, 'Message requis'),
  project: z.string().min(1, 'Détails requis'),
})

type FormValues = z.infer<typeof schema>

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormValues) => {
    const { error } = await submitContactRequest(data)
    if (error) {
      toast.error('Erreur lors de l\'envoi')
    } else {
      toast.success('Demande envoyée !')
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4">
      <input
        className="w-full border p-3 rounded"
        placeholder="Nom"
        {...register('name')}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        className="w-full border p-3 rounded"
        placeholder="Email"
        type="email"
        {...register('email')}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <textarea
        className="w-full border p-3 rounded"
        placeholder="Message"
        rows={3}
        {...register('message')}
      />
      {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

      <textarea
        className="w-full border p-3 rounded"
        placeholder="Détails du projet"
        rows={3}
        {...register('project')}
      />
      {errors.project && <p className="text-red-500 text-sm">{errors.project.message}</p>}

      <div className="text-center">
        <Button type="submit" loading={isSubmitting}>
          Envoyer
        </Button>
      </div>
    </form>
  )
}
