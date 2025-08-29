
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ContractorPhotoEvidence from "@/components/dashboard/contractor/ContractorPhotoEvidence";
import PhotoDetailsDialog from "@/components/dashboard/contractor/PhotoDetailsDialog";
import { Dialog } from "@/components/ui/dialog";

// Sample projects data
const projectsData = [
  {
    name: "Riverside Tower",
    units: ["Block A", "Block B", "Block C", "Block D"]
  },
  {
    name: "Valley Heights",
    units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
  },
  {
    name: "Green Villa",
    units: ["Villa 1", "Villa 2", "Villa 3"]
  }
];

// Sample in-progress tasks
const inProgressTasks = [
  {
    id: "task1",
    title: "Foundation concrete pouring",
    project: "Riverside Tower",
    unit: "Block A",
    phase: "groundwork_foundation"
  },
  {
    id: "task2",
    title: "Wall framing",
    project: "Valley Heights",
    unit: "Unit 3",
    phase: "structural_framework"
  },
  {
    id: "task3",
    title: "Electrical installation",
    project: "Green Villa",
    unit: "Villa 2",
    phase: "electrical_works"
  }
];

const ContractorPhotoEvidencePage = () => {
  const [photoDetailsOpen, setPhotoDetailsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
    setPhotoDetailsOpen(true);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Photo Evidence</h1>
          <p className="text-muted-foreground">
            Capture, upload, and manage construction progress photos
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Photo Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <ContractorPhotoEvidence 
              projectsData={projectsData}
              tasksData={inProgressTasks}
              onPhotoClick={handlePhotoClick}
            />
          </CardContent>
        </Card>
        
        <Dialog open={photoDetailsOpen} onOpenChange={setPhotoDetailsOpen}>
          <PhotoDetailsDialog
            onOpenChange={setPhotoDetailsOpen}
            photoEvidence={selectedPhoto}
          />
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default ContractorPhotoEvidencePage;
