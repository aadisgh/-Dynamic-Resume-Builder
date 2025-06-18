import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, X } from "lucide-react";
import { z } from "zod";
import { skillCategorySchema, type SkillCategory } from "@shared/schema";
import { nanoid } from "nanoid";

const skillsSchema = z.object({
  skills: z.array(skillCategorySchema),
});

interface SkillsFormProps {
  data: SkillCategory[];
  onChange: (data: SkillCategory[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkills, setNewSkills] = useState<Record<string, string>>({});

  const form = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: { skills: data },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const addSkillCategory = () => {
    append({
      id: nanoid(),
      name: "",
      skills: [],
    });
  };

  const addSkill = (categoryIndex: number) => {
    const categoryId = fields[categoryIndex].id;
    const skillText = newSkills[categoryId]?.trim();
    
    if (skillText) {
      const currentSkills = form.getValues(`skills.${categoryIndex}.skills`);
      if (!currentSkills.includes(skillText)) {
        form.setValue(`skills.${categoryIndex}.skills`, [...currentSkills, skillText]);
        setNewSkills(prev => ({ ...prev, [categoryId]: "" }));
        handleFormChange(form.getValues());
      }
    }
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const currentSkills = form.getValues(`skills.${categoryIndex}.skills`);
    const updatedSkills = currentSkills.filter((_, index) => index !== skillIndex);
    form.setValue(`skills.${categoryIndex}.skills`, updatedSkills);
    handleFormChange(form.getValues());
  };

  const handleFormChange = (values: { skills: SkillCategory[] }) => {
    onChange(values.skills);
  };

  const handleSkillInputKeyPress = (e: React.KeyboardEvent, categoryIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(categoryIndex);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-gray-800">Skills & Technologies</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSkillCategory}
          className="text-primary border-primary hover:bg-primary hover:text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Category
        </Button>
      </div>

      <Form {...form}>
        <form onChange={form.handleSubmit(handleFormChange)} className="space-y-4">
          {fields.map((field, categoryIndex) => (
            <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <FormField
                  control={form.control}
                  name={`skills.${categoryIndex}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="Programming Languages"
                          className="font-medium text-gray-800 bg-transparent border-none p-0 focus:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(categoryIndex)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {form.watch(`skills.${categoryIndex}.skills`).map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(categoryIndex, skillIndex)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                
                <div className="flex items-center space-x-2">
                  <Input
                    value={newSkills[field.id] || ""}
                    onChange={(e) => setNewSkills(prev => ({ ...prev, [field.id]: e.target.value }))}
                    onKeyPress={(e) => handleSkillInputKeyPress(e, categoryIndex)}
                    placeholder="Add skill"
                    className="h-6 text-xs px-2 border-dashed border-gray-300"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addSkill(categoryIndex)}
                    className="h-6 px-2 text-xs text-primary hover:text-primary"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-4">No skill categories added yet.</p>
              <Button type="button" onClick={addSkillCategory} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Skill Category
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
