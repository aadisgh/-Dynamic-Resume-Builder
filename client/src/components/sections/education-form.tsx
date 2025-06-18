import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { z } from "zod";
import { educationSchema, type Education } from "@shared/schema";
import { nanoid } from "nanoid";

const educationsSchema = z.object({
  education: z.array(educationSchema),
});

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const form = useForm({
    resolver: zodResolver(educationsSchema),
    defaultValues: { education: data },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const addEducation = () => {
    append({
      id: nanoid(),
      degree: "",
      institution: "",
      location: "",
      graduationYear: "",
      gpa: "",
    });
  };

  const handleFormChange = (values: { education: Education[] }) => {
    onChange(values.education);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-gray-800">Education</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEducation}
          className="text-primary border-primary hover:bg-primary hover:text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </Button>
      </div>

      <Form {...form}>
        <form onChange={form.handleSubmit(handleFormChange)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">Education #{index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <FormField
                control={form.control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree *</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor of Science in Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`education.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution *</FormLabel>
                    <FormControl>
                      <Input placeholder="Stanford University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name={`education.${index}.graduationYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year</FormLabel>
                      <FormControl>
                        <Input placeholder="2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.gpa`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GPA (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="3.8/4.0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No education added yet.</p>
              <Button type="button" onClick={addEducation} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Education
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
