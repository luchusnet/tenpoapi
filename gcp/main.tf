# Configure the Google Cloud provider
provider "google" {
  project = "estratec-cloud"
  region  = "us-central1"
  zone    = "us-central1-c"
}

# Create a Google Compute Firewall
resource "google_compute_firewall" "instance" {
  name    = "tenpo-challenge"
  network = "default"

  source_ranges = ["0.0.0.0/0"]

  allow {
    protocol = "tcp"
    ports    = ["3000"]
  }
}

# Create a Google Compute instance
resource "google_compute_instance" "tenpo-api" {
  name          = "tenpo-api"
  machine_type  = "n1-standard-1"
  zone          = "us-central1-c"
  tags          = ["ssh","http"]
  
  boot_disk {
    initialize_params {
      image = "ubuntu-1604-lts"
    }
  }
  
  network_interface {
    network = "default"

    access_config {
      // Ephemeral IP
    }
  }
  
  metadata = {
        startup-script = <<SCRIPT
        export NODE_ENV=testing
        SCRIPT
    }
  
  
}

resource "google_compute_instance" "tenpo-bd" {
  name          = "tenpo-bd"
  machine_type  = "n1-standard-1"
  zone          = "us-central1-c"
  tags          = ["ssh","http"]
  
  boot_disk {
    initialize_params {
      image = "ubuntu-1604-lts"
    }
  }
  
  network_interface {
    network = "default"
  }
  
  metadata = {
        startup-script = <<SCRIPT  
          export NODE_ENV=testing        
        SCRIPT
    }
  
  
}
